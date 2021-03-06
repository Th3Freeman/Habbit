import React from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import AuthContext from '../../contexts/AuthContext';
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg";
import TaskForm from "../../components/TaskForm/TaskForm";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function Task() {
  const classes = useStyles();
  const authContext = React.useContext(AuthContext);
  const [state, setState] = React.useState({
    error: ""
  });

  const handleSubmit = (title, dueDate, description) => {
    const { user } = authContext;
    user.todos.push({title, dueDate, description}); 
    authContext.updateUser(user);
    setState({...state, redirect: '/'});
  };
  if (state.redirect) {
    return <Redirect to={{ pathname: state.redirect }} />;
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {state.error && (
          <Grid item xs={12}>
            <ErrorMsg className={classes.margin} message={state.error} />
          </Grid>
        )}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <TaskForm onSubmit={handleSubmit} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
