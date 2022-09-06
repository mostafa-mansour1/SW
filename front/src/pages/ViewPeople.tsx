import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonSpinner,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useState } from "react";
import { useParams } from "react-router";
import { getPeople } from "../data/peoples";
import { FirstLetter, SheOrHe } from "../functions/GeneralFunction";
import { IPeople } from "../interfaces/SWApiInterface";
import "./ViewPeople.css";

function ViewPeople() {
  const [people, setPeople] = useState<IPeople>();
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);

  useIonViewWillEnter(async () => {
    setLoading(true);
    const people = await getPeople(parseInt(params.id, 10));
    setPeople(people);
    setLoading(false);
  });

  return (
    <IonPage id="view-people-page">
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton text="Home" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent color="primary">
        <div className="ion-text-center">
          <img alt="logo" height="100" src="assets/logo.png" />
        </div>
        <IonGrid fixed>
          <IonRow>
            {loading ? (
              <IonCol className="ion-text-center">
                <IonSpinner color="light"></IonSpinner>
              </IonCol>
            ) : (
              <IonCol>
                {people ? (
                  <>
                    <IonCard>
                      <div
                        className="titleBG"
                        style={{
                          backgroundColor: people.color,
                          color: people.color,
                        }}
                      >
                        <span>{FirstLetter(people.name)}</span>
                      </div>
                      <IonCardHeader>
                        <IonCardSubtitle>
                          {people.gender}
                          {!people?.gender?.includes("male") ? " gender" : ""}
                        </IonCardSubtitle>
                        <IonCardTitle>{people.name}</IonCardTitle>
                      </IonCardHeader>

                      <IonCardContent>
                        <p>
                          The Star War {people.name} born in {people.birth_year}
                          , {SheOrHe(people?.gender)} has a weight of{" "}
                          {people.mass}
                          KG and a height of {people.height}.{" "}
                          {SheOrHe(people?.gender)} has a {people.skin_color}{" "}
                          skin color and {people.eye_color} eye color.
                        </p>
                        <p>
                          {SheOrHe(people?.gender)} participated in{" "}
                          {people.films.length} film(s) and used{" "}
                          {people.starships.length} starship(s) and rode{" "}
                          {people.vehicles.length} Vehicle(s)
                        </p>
                      </IonCardContent>
                    </IonCard>
                  </>
                ) : (
                  <div>People not found</div>
                )}
              </IonCol>
            )}
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default ViewPeople;
