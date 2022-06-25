import { Fragment } from "react";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>Meetups - {props.meetupData.title}</title>
        <meta
          name="description"
          content={props.meetupData.description+" "+props.meetupData.address+" "+props.meetupData.title}
        />
      </Head>
      <MeetupDetail
      address={props.meetupData.address}
      title={props.meetupData.title}
      id={props.meetupData._id}
      image={props.meetupData.image}
      description={props.meetupData.description}
    />
    </Fragment>
    
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://Csa1999:Xls50h..@cluster0.9x0vy.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://Csa1999:Xls50h..@cluster0.9x0vy.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetups = await meetupsCollection.findOne({_id: ObjectId(meetupId)});

  client.close();

  return {
    props: {
      meetupData: {
        address: selectedMeetups.address,
        title: selectedMeetups.title,
        id: selectedMeetups._id.toString(),
        image: selectedMeetups.image,
        description: selectedMeetups.description,
      }
    },
  };
}

export default MeetupDetails;
