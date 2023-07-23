import React, { useEffect, useState } from "react";
import "./ListClans.css";
export default function ListClans() {
  const [clans, setClans] = useState<any[]>([]);
  const [clanName, setClanName] = useState("");
  const [clanMinMember, setClanMinMenber] = useState("");
  const [clanMinPoints, setClanMinPoints] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const makeAPICall = async () => {
    const params = new URLSearchParams();
    clanName && clanName.length >= 3 && params.append("name", clanName);
    clanMinMember !== "" && params.append("minMembers", clanMinMember);
    clanMinPoints !== "" && params.append("minClanPoints", clanMinPoints);
    params.append("limit", "20");
    try {
      const response = await fetch("http://localhost:8080/clans?" + params, {
        mode: "cors",
      });
      const data = await response.json();
      setClans(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (
      (clanName !== "" && clanName.length >= 3) ||
      clanMinMember !== "" ||
      clanMinPoints !== ""
    )
      makeAPICall();
  }, [clanName, clanMinMember, clanMinPoints, makeAPICall]);

  const handleChange = (event: any) => {
    setClanName(event.target.value);
  };

  const handleMinMemberChange = (event: any) => {
    if (
      !isNaN(+event.target.value) &&
      event.target.value !== "1" &&
      event.target.value.length <= 9
    )
      setClanMinMenber(event.target.value);
  };
  const handleMinPointsChange = (event: any) => {
    if (!isNaN(+event.target.value) && event.target.value.length <= 9)
      setClanMinPoints(event.target.value);
  };

  return (
    <div className="list-clans-container">
      <form className="filter-form">
        <div className="form-group">
          <label htmlFor="clanName">Nombre del clan:</label>
          <input
            type="text"
            id="clanName"
            className="form-control rounded"
            value={clanName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="clanMinMember">Miembros minimos:</label>
          <input
            type="text"
            id="clanMinMember"
            className="form-control rounded"
            value={clanMinMember}
            onChange={handleMinMemberChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="clanMinPoints">Minimo de puntos:</label>
          <input
            type="text"
            id="clanMinPoints"
            className="form-control rounded"
            value={clanMinPoints}
            onChange={handleMinPointsChange}
          />
        </div>
      </form>
      <div className="clan-list">
        {clans.map((clan) => {
          return (
            <div key={clan.tag} className="clan-card">
              <h1>{clan.name}</h1>
              <p>{clan.tag}</p>
              <p>Miembros en el clan: {clan.members}</p>
              <p>Puntos del clan: {clan.clanPoints}</p>
              <p>Nivel del clan: {clan.clanLevel}</p>
              <p>Guerras ganadas: {clan.warWins}</p>
              <p>Guerras perdidas: {clan.warLosses}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
