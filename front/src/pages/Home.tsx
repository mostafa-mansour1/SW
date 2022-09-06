import {
  IonButton,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useState } from "react";
import PeopleListItem from "../components/PeopleListItem";
import { getAllPeople } from "../data/peoples";
import { IPeople } from "../interfaces/SWApiInterface";
import "./Home.css";

const Home: React.FC = () => {
  const [peoples, setPeoples] = useState<IPeople[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useIonViewWillEnter(async () => {
    setPage(1);
    setLoading(true);
    const peoples = await getAllPeople(page);
    setPeoples(peoples);
    setLoading(false);
  });

  const nextPage = async () => {
    setLoading(true);
    console.log(page);
    const nextPage = page + 1;
    setPage(nextPage);
    const pagedPeoples = await getAllPeople(nextPage);
    if (pagedPeoples.length) {
      console.log("pagedPeoples", pagedPeoples);
      setPeoples([...peoples, ...pagedPeoples]);
    } else {
      setPage(0);
    }
    setLoading(false);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle>Start Wars Characters</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="primary">
        <div className="ion-text-center">
          <img alt="logo" height="100" src="assets/logo.png" />
        </div>
        <IonGrid fixed>
          <IonRow>
            {peoples.map((m) => (
              <PeopleListItem key={m.id} people={m} />
            ))}
          </IonRow>
        </IonGrid>
        {page ? (
          <div className="ion-text-center">
            <IonButton color="secondary" onClick={nextPage}>
              <>
                {loading ? (
                  <IonSpinner></IonSpinner>
                ) : (
                  <> View More {/*page*/}</>
                )}
              </>
            </IonButton>
          </div>
        ) : (
          ""
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
