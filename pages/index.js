import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="decription"
          content="Add or View your own meetups with us! Share your favorite places and memorys with us."
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  //data fetching for SSR (server side rendering)
  const client = await MongoClient.connect(
    "mongodb+srv://Csa1999:Xls50h..@cluster0.9x0vy.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        id: meetup._id.toString(),
        image: meetup.image,
      })),
    },
    revalidate: 10, //revalidate every 10 second
  };
}

/*export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;

  //fetch data from external API
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}*/

export default HomePage;
