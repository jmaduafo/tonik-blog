import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { db, auth } from '../../firebase/config'
import { doc, collection, getDoc, getDocs, where, addDoc, query, updateDoc, serverTimestamp } from 'firebase/firestore'
import { timestamp } from '../../utils/timestampConverter'
import InputEmoji from 'react-input-emoji'
import { ToastContainer, toast } from 'react-toastify'
import parse from 'html-react-parser';
import Picker from 'emoji-picker-react';
import './detail.scss'

function Detail() {
    const [detailInfo, setDetailInfo ] = useState()
    const [inputStr, setInputStr] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const [clicked, setClick] = useState(false);
    const [commentDisplay, setCommentDisplay] = useState();

    const onEmojiClick = (emojiObject) => {
        setInputStr((prevInput) => prevInput + emojiObject.emoji);
    };
    const { userId, postId } = useParams()

    function detailGet() {
        const detailRef = doc(db, "posts", postId);

        async function getDetail() {
            const docSnap = await getDoc(detailRef)

            setDetailInfo(docSnap.data())
        }

        getDetail()
    }

    function handleComment(e) {
        e.preventDefault()

        setClick(prev => !prev)

        if (!inputStr.length) {
            toast.error('Comments cannot be empty!', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        } else {
            const commentRef = collection(db, "comments")

            async function commentAdd() {
                try {
                    await addDoc(commentRef, {
                        user_id: userId,
                        post_id: postId,
                        content: inputStr,
                        commenter: auth?.currentUser?.uid,
                        timestamp: serverTimestamp()
                    })

                    const commentAddedRef = query(collection(db, "comments"), where("commenter", "==", auth?.currentUser?.uid), where("content", "==", inputStr))
                    const commentSnap = await getDocs(commentAddedRef)

                    const userRef = doc(db, "users", auth?.currentUser?.uid)
                    const userSnap = await getDoc(userRef)

                    commentSnap.forEach(comment => {
                        async function commenter() {
                            await updateDoc(comment.ref, {
                                id: comment.id,
                                user: userSnap.data()
                            })

                        }

                        commenter()
                    })

                    toast.success('Posted successfully!', {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });

                    setInputStr('')
                } catch (err) {
                    toast.error('Something went wrong', {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });

                    console.log(err)
                }
            }

            commentAdd()
        }

        
      }

      function showComments() {
        const commentRef = query(collection(db, "comments"), where("post_id", "==", postId));

        async function getComments() {
            const docSnap = await getDocs(commentRef)
  
            const comments= []
  
            docSnap.forEach(doc => {
              comments.push({...doc.data(), id: doc.id})
              
            })
  
            setCommentDisplay(comments)
        }
        getComments()

        
      }

    useEffect(function() {
        detailGet()
        showComments()
        // console.log(commentDisplay)

    }, [clicked])
  return (
    <div className='detail-section'>
        <div className='detail-container'>
            <ToastContainer/>
            <h4>{detailInfo?.title}</h4>
            <div className='user-info-save'>
                <div className='user-info'>
                    <Link to={detailInfo?.user_id === auth?.currentUser?.uid ? '/profile/user' : `/profile/${detailInfo?.user_id}`}><div className='user-image'>
                        {detailInfo?.profileUrl ? <img src={detailInfo?.profileUrl} alt={postId}/> : <i className='bx bxs-user'></i>}
                    </div>
                    </Link>
                    <div className='username-timestamp'>
                        {detailInfo?.user && <p>{detailInfo?.user?.username}</p>}
                        {timestamp(detailInfo?.timestamp?.seconds) === 'Invalid Date' ? <p></p> : <p>{timestamp(detailInfo?.timestamp?.seconds)}</p>}
                    </div>
                </div>
                <div className='save'>
                    {userId === auth?.currentUser?.uid ? <Link to={`/edit/${userId}/${postId}`}><i title='Edit' className='bx bx-message-square-edit' ></i></Link> : <i className='bx bx-bookmark' ></i>}
                </div>
            </div>
            <div className='comment-save-view'>
                <div className='comment-save'>
                    <div>
                        <i className='bx bxs-message-rounded-dots' ></i>
                        <p>{commentDisplay?.length} comment{commentDisplay?.length === 1 ? '' : 's'}</p>
                    </div>
                    <div>
                        <i className='bx bxs-bookmark'></i>
                        <p>0 saves</p>
                    </div>
                </div>
                <div className='view'>
                    <p>0 views</p>
                </div>
            </div>
            <div className='thumbnail-image'>
                <div className='thumbnail'>
                    <img src={detailInfo?.imageUrl} alt={postId + ' thumbnail'}/>
                </div>  
            </div>
            <div className='content'>
                {typeof detailInfo?.content === 'string' && parse(detailInfo?.content)}
            </div>
            <div className='detail-comments'>
                <h5>{commentDisplay?.length} comment{commentDisplay?.length === 1 ? '' : 's'}</h5>
                <form className='comment-form' onSubmit={handleComment}>
                    <div className='comment-top'>
                        <div className='comment-emoji'>
                            <div className='textarea-emoji'>
                                <textarea placeholder='Add a comment' className="input-style" value={inputStr} onChange={(e) => setInputStr(e.target.value)}></textarea>
                            </div>
                            <div className='icon-emoji'>
                                <i className='bx bxs-smile' style={{ color: showPicker ? 'rgb(187, 200, 207)' : 'black'}} onClick={() => setShowPicker((val) => !val)}></i>
                            </div>
                        </div>
                        <button type='submit'>Send</button> 
                    </div>
                    <div className='picker' style={{ position: 'absolute', marginTop: '20px', height: '200px', overflowY: 'auto' }}>
                        {showPicker && (
                            <Picker pickerStyle={{ width: "100%" }} onEmojiClick={onEmojiClick} />
                            )}
                    </div>
                </form>
                <div className='comment-display'>
                    {!commentDisplay?.length ? 
                    <div className='first-comment'>
                        <p>Be the first to comment</p>
                    </div> :
                    <div className='show-comment'>
                        {commentDisplay?.map(comment => {
                            return (
                                <div className='user-info' key={comment.timestamp?.seconds}>
                                    <div className='user'>
                                        <Link to={comment.user?.id === auth?.currentUser?.uid ? '/profile/user' : `/profile/${comment.user?.id}`}>
                                            <div className='user-image'>
                                                {comment?.user?.profileUrl ? <img src={comment?.user?.profileUrl} alt={postId}/> : <i className='bx bxs-user'></i>}
                                            </div>
                                        </Link>
                                        <div>
                                            <div className='username-timestamp'>
                                                {comment.user && <p>{comment.user?.username}</p>}
                                                <p>&#183;</p>
                                                {timestamp(comment?.timestamp?.seconds) === 'Invalid Date' ? <p></p> : <p>{timestamp(comment?.timestamp?.seconds)}</p>}
                                            </div>
                                            <div className='comment-content'><p>{comment.content}</p></div>
                                        </div>
                                    </div>
                                    
                                </div>
                            )
                        })}
                    </div>}
                </div>

                
            </div>
            
        </div>
    </div>
  )
}

export default Detail