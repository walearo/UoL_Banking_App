import React from "react"
import SweetAlert from "sweetalert-react" // eslint-disable-line import/no-extraneous-dependencies
import "sweetalert/dist/sweetalert.css"

function Alert({ message, type }) {
  //type =0 or 1, => 0=error and 1=success
  return (
    <div>
      <button onClick={() => this.setState({ show: true })}>Alert</button>
      <SweetAlert
        icon={type === 0 ? "error" : "success"}
        show={true}
        title={type === 0 ? "Error" : "Success"}
        text={message}
      />
    </div>
  )
}

export default Alert
