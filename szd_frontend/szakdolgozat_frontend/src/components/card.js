import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/DataContext";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

export default function CostumCard(props) {
  const { setData } = useContext(Context);
  function handleClick() {
    setData(props.linkTo);
  }

  const cardMain = () => (
    <Card className={props.cardClass} onClick={handleClick}>
      {props.cardImage && <Card.Img variant="top" src={props.cardImage} />}
      {(props.cardTitle || props.cardText) && (
        <Card.Body className={props.bodyClass}>
          {props.cardTitle && (
            <Card.Title className={props.titleClass}>
              {props.cardTitle}
            </Card.Title>
          )}
          {props.cardText && <Card.Text>{props.cardText}</Card.Text>}
        </Card.Body>
      )}
      {props.cardFooter && (
        <Card.Footer>
          <small className="text-muted">{props.cardFooter}</small>
        </Card.Footer>
      )}
    </Card>
  );

  return props.inCardGroup ? (
    <CardGroup>
      <Link to={props.linkTo}>{cardMain()}</Link>
    </CardGroup>
  ) : (
    <Link to={props.linkTo}>{cardMain()}</Link>
  );
}
