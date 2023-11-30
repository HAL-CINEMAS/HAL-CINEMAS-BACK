import app from './firebase.js'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

const db = getFirestore(app)
async function fetchData() {
  const datalist = []
  const querySnapshot = await getDocs(collection(db, 'movie'))
  querySnapshot.forEach((doc) => {
    const data = doc.data().data
    const msdata = data.seconds * 1000
    const date = new Date(msdata)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const formattedDate = `${year}年${month}月${day}日`
    const updatedData = { ...doc.data(), data: formattedDate, id: doc.id }
    datalist.push(updatedData)
  })
  return datalist
}

export default fetchData
