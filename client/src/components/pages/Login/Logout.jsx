import { useNavigate } from "react-router-dom"

function Logout() {
  const redirect = useNavigate()

  async function HandleLogout() {
    localStorage.removeItem("token")
    redirect("/login")
  }
  HandleLogout()
}

export default Logout
