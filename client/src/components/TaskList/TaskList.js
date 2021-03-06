import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  button: {
    margin: 10
  },
  card: {
    minWidth: 275,
    margin: 20
  },
  img: {
    margin: 20
  },
  line: {
    margin: 15
  }
}));

export default function TaskList(props) {
  const classes = useStyles();
  const incompleteTasks = props.tasks.filter(task => !task.complete);
  const renderTasks = incompleteTasks.map(function(task, index) {
    console.log(typeof task._id);
    return task && task._id && (
      <Card className={classes.card} key={task.id}>
        <CardContent>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <h3>Date: {task.dueDate}</h3>
          <h4>
            Priority:
            {task.priority}
          </h4>
          <h5>Completed: {task.complete ? "Yes" : "No"}</h5>
          {!task.complete && (
            <Button
              onClick={() => props.taskClick(task._id)}
              className={classes.button}
              type="button"
              size="large"
              variant="outlined"
              color="primary"
            >
              Complete Task
            </Button>
          )}
        </CardContent>
      </Card>
    );
  });
  return incompleteTasks.length ? (
    <div className="TaskList">{renderTasks}</div>
  ) : (
    <div>
      <h2>All Tasks Completed!</h2>
      <p>Your pet will get hungry!</p>
      <Link to="/task">Create more tasks to complete</Link>
    </div>
  );
}
