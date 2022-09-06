import { IonAvatar, IonCol, IonItem, IonLabel, IonNote } from "@ionic/react";
import { FirstLetter } from "../functions/GeneralFunction";
import { IPeople } from "../interfaces/SWApiInterface";
import "./PeopleListItem.css";

interface PeopleListItemProps {
  people: IPeople;
}

const PeopleListItem: React.FC<PeopleListItemProps> = ({ people }) => {
  return (
    <IonCol sizeLg="4" sizeMd="6" sizeSm="12" sizeXs="12">
      <IonItem
        color="primary"
        routerLink={`/people/${people.id}`}
        detail={false}
        className="PeopleIonColItem"
      >
        <IonAvatar slot="start">
          <div
            className="firstLetters"
            style={{ backgroundColor: people.color }}
          >
            <span>{FirstLetter(people.name)}</span>
          </div>
        </IonAvatar>
        <IonLabel className="ion-text-wrap">
          <h2>
            <strong>
              <IonLabel color="secondary">{people.name}</IonLabel>
            </strong>
          </h2>
          <h3 className="capitalize">
            {people.gender}
            {!people.gender.includes("male") ? " gender" : ""}
          </h3>
          <small>
            <IonLabel color="medium">
              <p>
                Height: {people.height}cm, Weight: {people.mass}kg
              </p>
              <p>
                Skin: {people.skin_color}, Eye: {people.skin_color}
              </p>
            </IonLabel>
          </small>
        </IonLabel>

        <IonNote slot="end" className="ion-text-end">
          <small>
            <IonLabel>Birth</IonLabel>
            <IonLabel>
              <strong>{people.birth_year}</strong>
            </IonLabel>
          </small>
        </IonNote>
      </IonItem>
    </IonCol>
  );
};

export default PeopleListItem;
