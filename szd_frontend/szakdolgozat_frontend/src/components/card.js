import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/DataContext";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

export default function CostumCard(props) {
  const { setData } = useContext(Context);
  function handleClick() {
    setData(props.link);
  }

  function cardTitle() {
    if (props.cardTitle !== undefined) {
      return(<Card.Title>{props.cardTitle}</Card.Title>);
    } else {
      return null;
    }
  }

  function cardText() {
    if (props.cardText !== undefined) {
      return(<Card.Text>{props.cardText}</Card.Text>);
    } else {
      return null;
    }
  }

  function cardBody() {
    if (props.cardTitle !== undefined && props.cardText !== undefined) {
      return(<Card.Body>{cardTitle() + cardText()}</Card.Body>);
    } else {
      return null;
    }
  }

  function cardImage() {
    if (props.cardImage !== undefined) {
      return(<Card.Img variant="top" src={props.cardImage} />);
    } else {
      return null;
    }
  }

  function cardFooter() {
    if (props.cardFooter !== undefined) {
      return(<Card.Footer>
        <small className="text-muted">{props.cardFooter}</small>
      </Card.Footer>);
    } else {
      return null;
    }
  }

  const cardMain = () => (
    <Card className={props.cardClass} onClick={handleClick}>
      {props.cardImage && <Card.Img variant="top" src={props.cardImage} />}
      {(props.cardTitle || props.cardText) && (
        <Card.Body className={props.bodyClass}>
          {props.cardTitle && <Card.Title className={props.titleClass}>{props.cardTitle}</Card.Title>}
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
      {cardMain()}
    </CardGroup>
  ) : (
    <Link to={props.linkTo}>
      {cardMain()}
    </Link>
  );
}
