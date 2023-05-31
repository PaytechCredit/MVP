import React from "react";
// Redux
import { connect } from "react-redux";
import {
  getApplicationsList,
  resetApplicationDetails,
  handleApplicationStep
} from "_actions/application";
// Router
import { Link } from "react-router-dom";
// Bootstrap
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Alert from "react-bootstrap/Alert";

function Dashboard(props) {
  React.useEffect(() => {
    if (sessionStorage.getItem("token")) {
      props.dispatch(getApplicationsList());
    }
    props.dispatch(handleApplicationStep(0));
    props.dispatch(resetApplicationDetails());
  }, [sessionStorage.getItem("token")]);

  const [alertState, setAlertState] = React.useState({
    show: false,
    message: "",
    variant: ""
  });

  const tableRows = props.application.applicationList.map((item, index) => {
    return (
      <tr
        key={index}
        className="selectable-table-row"
        onClick={event => {
          if (item.status.text === "Draft") {
            props.history.push("/application/" + item.id);
          } else {
            console.log("cant perform");
          }
        }}
      >
        <td>{item.id}</td>
        <td>{item.purpose}</td>
        <td>{item.created_at}</td>
        <td>
          <Badge
            variant={item.status.text === "Draft" ? "warning" : "info"}
            className="p-2 rounded"
          >
            {item.status.text}
          </Badge>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <Alert
        show={alertState.show}
        dismissible
        onClose={() => setAlertState({ ...alertState, show: false })}
      >
        {alertState.message}
      </Alert>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <span className="float-right">
                <Link className="btn btn-primary btn-rounded" to="/application">
                  New Application
                </Link>
              </span>
              <h4 className="mb-4"> List of Applications</h4>
              <div className="dashboard-datatable">
                <Table responsive>
                  <thead>
                    <tr>
                      <td>Application ID</td>
                      <td>Purpose</td>
                      <td>Created At</td>
                      <td>Status</td>
                    </tr>
                  </thead>
                  {props.application.applicationList.length <= 0 ? (
                    <tbody>
                      <tr>
                        <td>No Applications have submitted.</td>
                        <td />
                        <td />
                        <td />
                      </tr>
                    </tbody>
                  ) : (
                    <tbody>{tableRows}</tbody>
                  )}
                </Table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
function mapStateToProps(state) {
  return { application: state.application };
}
export default connect(mapStateToProps)(Dashboard);
