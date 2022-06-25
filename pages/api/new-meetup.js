import { MongoClient } from 'mongodb';


//api/new.meetup
//req.method === 'POST Csak postra reagál ez a root


async function handelr(req, res) {
  if(req.method === 'POST'){
    const data = req.body;

    const client = await MongoClient.connect('mongodb+srv://Csa1999:Xls50h..@cluster0.9x0vy.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();
    res.status(201).json({messege: 'Meetup Inserted'});
}
}

export default handelr;