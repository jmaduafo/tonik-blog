import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { db, auth } from '../../firebase/config'
import { doc, collection, getDoc, getDocs, where, query } from 'firebase/firestore'
import { timestamp } from '../../utils/timestampConverter'
import InputEmoji from 'react-input-emoji'
import parse from 'html-react-parser';
import Picker from 'emoji-picker-react';
import './detail.scss'

function Detail() {
    const [ detailInfo, setDetailInfo ] = useState()
    const [ text, setText ] = useState('')
    const [inputStr, setInputStr] = useState("");
    const [showPicker, setShowPicker] = useState(false);

    const onEmojiClick = (emojiObject) => {
        setInputStr((prevInput) => prevInput + emojiObject.emoji);
        setShowPicker(false);
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
      }

    useEffect(function() {
        detailGet()
        console.log(detailInfo)

    }, [postId])
  return (
    <div className='detail-section'>
        <div className='detail-container'>
            <h4>{detailInfo?.title}</h4>
            <div className='user-info-save'>
                <div className='user-info'>
                    <div className='user-image'>
                        {detailInfo?.profileUrl ? <img src={detailInfo?.profileUrl} alt={postId}/> : <i class='bx bxs-user'></i>}
                    </div>
                    <div className='username-timestamp'>
                        {detailInfo?.user && <p>detailInfo.user.username</p>}
                        {timestamp(detailInfo?.timestamp?.seconds) === 'Invalid Date' ? <p></p> : <p>{timestamp(detailInfo?.timestamp?.seconds)}</p>}
                    </div>
                </div>
                <div className='save'>
                    {userId === auth?.currentUser?.uid ? <Link to={`/edit/${userId}/${postId}`}><i title='Edit' className='bx bx-message-square-edit' ></i></Link> : <i class='bx bx-bookmark' ></i>}
                </div>
            </div>
            <div className='comment-save-view'>
                <div className='comment-save'>
                    <div>
                        <i className='bx bxs-message-rounded-dots' ></i>
                        <p>0 comments</p>
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
            <div className='content'>
                {typeof detailInfo?.content === 'string' && parse(detailInfo?.content)}
            </div>
            <div className='detail-comments'>
                <h5>{detailInfo?.commentCount ? detailInfo?.commentCount + ' Comments' : '0 Comments'}</h5>
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
                            <button>Send</button> 
                        {/* <div className='comment-btn' type='submit'>
                            <i class='bx bxs-send' ></i> 
                            <button>Send</button> 
                        </div> */}
                        
                    </div>
                    <div className='picker' style={{ position: 'absolute', marginTop: '20px', height: '200px', overflowY: 'auto' }}>
                        {showPicker && (
                            <Picker pickerStyle={{ width: "100%" }} onEmojiClick={onEmojiClick} />
                            )}
                    </div>
                </form>
                <div className='comment-display'>
                    {detailInfo?.commentCount && detailInfo?.commentComment === 0 ? 
                    <div>
                        <p>Be the first to comment</p>
                    </div> :
                    <div>
                        <p>User Comment</p>
                    </div>}
                    <h3>I know the answers</h3>
                </div>
                
            </div>
            
        </div>
    </div>
  )
}

export default Detail