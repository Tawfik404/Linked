import api from "@/config/api"
import { useEffect, useState } from "react"
import countries from '@/assets/country-flag.json'


export default function UsersDetails({ id }) {
  const [user,setUser] = useState({
    image: "https://placekitten.com/200/200",
     firstname: "John",
    lastname: "Doe",
     email: "john.doe@example.com",
     date: "1999-05-12",
     country: "Morocco",
     currency: "MAD",
     color: "#4F46E5",
 });
  useEffect(() => {
    api.get(`/user/${id}`)
      .then((res) => {
        console.log(res.data.user);
        setUser(res.data.user)
      })
      .catch(err => {
        console.log(err);
      })
  }, [id])

  return (
    
 <div className="w-full max-w-sm self-center"
      style={{
        width: "320px",
        padding: "24px",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          width: "110px",
          height: "110px",
          borderRadius: "50%",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <img
          src={user.image}
          alt={`${user.firstname} ${user.lastname}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      <div className="text-center">
        <h2
          style={{
            margin: 0,
            fontSize: "20px",
            fontWeight: "700",
            color: user.color,
          }}
        >
          {user.firstname} {user.lastname}
        </h2>

        <p
          style={{
            margin: "4px 0",
            fontSize: "15px",
            color: "#555",
          }}
        >
          {user.email}
        </p>
      </div>

      <div
        style={{
          width: "100%",
          background: "#f7f7f8",
          padding: "16px",
          borderRadius: "14px",
          fontSize: "14px",
          color: "#444",
          display: "grid",
          gap: "6px",
        }}
      >
        <div className="flex justify-center">
          <span style={{ fontWeight: 600 }}>Birthdate:</span> {user.date}
        </div>
        <div className="flex justify-center gap-1">
          <span style={{ fontWeight: 600 }}>Country:</span>
              {countries.map((country) => {
                if(country.country == user.country){
                  return <img alt={country.code} src={country.flag} className="w-5" />
                  }
              })}
           {user.country}
        </div>
        <div className="flex justify-center">
          <span style={{ fontWeight: 600 }}>Currency:</span> {user.currency}
        </div>
        <div className="flex justify-center gap-1">
          <span style={{ fontWeight: 600 }}>Color:</span>

          <div className="w-5" style={{ backgroundColor:user.color,borderRadius:"100px" }}></div>
        </div>
      </div>
    </div>

   )
}