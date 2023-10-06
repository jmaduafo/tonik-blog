import { auth, db } from '../../firebase/config'
import { onSnapshot, query, collection, where, orderBy, limit, getDocs } from 'firebase/firestore'

export function suggestedUsers() {
    
    // Check in users database, query by timestamp, arrange in descending order and get the top 5
    const users = query(collection(db, 'users'), orderBy("timestamp", "desc"), limit(5))

    onSnapshot(users, (snapshot) => {
        const suggestedUsers = []

        const unsubscribe = snapshot.forEach(doc => {
            suggestedUsers.push(doc.data())
        })

        unsubscribe();

        return suggestedUsers
    })
   
}

export function feed() {
    const feedBlogs = query(collection(db, 'posts'), orderBy("timestamp", "desc"))


}

export async function blogsForYou() {

}

