import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { exportDoc } from './../services/exportContentToDocx';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export function AccordionPreview({ attack }) {
  const classes = useStyles();


  const { id, name, created, description } = attack.objects[0];

  return (
    <section className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}><span className="headline">
            {name}</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'div'} variant={'body2'}>
            <div id="exportContent">
              <span className="headline">Attack ID:</span> <p>{id}</p>
              <span className="headline">Created: </span> <p>{moment(created).calendar()}</p>
              <div>
                {description &&
                  <div> <span className="headline">Description:</span> <p>{description}</p>
                  </div>}
              </div>
            </div>
            <div className="actions">
              <div>
              {attack.objects[0].x_mitre_detection &&
                <Button onClick={() => exportDoc(attack)}
                  variant="contained">Export as .docx</Button>}
              </div>
              <Link to={`/${attack._id}`}>
                <div className="details-btn"> <Button variant="contained">Details</Button></div>
              </Link>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </section>
  );
}
