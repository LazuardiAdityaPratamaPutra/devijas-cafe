import styles from "./NavbarAdmin.module.css";
import logoDeVijasCafe from "../../../assets/logo-de.png";
import profilAdmin from "../../../assets/profil-admin.jpg";
import { GoBellFill } from "react-icons/go";
import { RiArrowDropDownFill } from "react-icons/ri";
import { useState } from "react";
import Button from "../Button";

const NavbarAdmin = () => {
  const [isDropDownOpen, setDropDownOpen] = useState(false);
  const [isBellColor, setBellColor] = useState(false);

  const toggleDropDown = () => {
    setDropDownOpen(!isDropDownOpen);
  };

  const setColorYellow = () => {
    setBellColor(!isBellColor);
  }

  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.location.href = "/auth";
  };
  return (
    <main className={styles.main}>
      <img
        src={logoDeVijasCafe}
        alt="Logo De Vijas Cafe"
        className={styles.imgLogo}
      />
      <h1>Orders</h1>
      <div className={styles.profile}>
        <GoBellFill
          className={`${styles.iconBell} ${isBellColor && styles.iconBellYellow}`}
          onClick={setColorYellow}
        />
        <div className={styles.profileDropDown}>
          <img
            src={profilAdmin}
            alt="Profil Admin De Vijas Cafe"
            className={styles.profileAdmin}
            onClick={toggleDropDown}
          />
          <RiArrowDropDownFill
            style={{ color: "var(--abu-terang)", fontSize: "24px" }}
            className={styles.iconDropDown}
            onClick={toggleDropDown}
          />
        </div>

        {isDropDownOpen && (
          <div className={styles.btnLogout} onClick={handleLogout}>
            <Button type="submit" className={styles.btn}>Logout</Button>
          </div>
        )}


      </div>
    </main>
  );
};

export default NavbarAdmin;
