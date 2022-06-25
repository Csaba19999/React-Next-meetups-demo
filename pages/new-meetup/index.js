import { useRouter } from "next/router";
import Head from "next/head";
import { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetup() {
  const history = useRouter();

  const addMeetupHandeler = async (enteredMeetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enteredMeetupData),
    });

    const data = await response.json();
    console.log(data);
    history.replace("/");
  };

  return (
    <Fragment>
      <Head>
        <title>New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups here right now for free. Share your favorite place."
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandeler} />
    </Fragment>
  );
}

export default NewMeetup;
