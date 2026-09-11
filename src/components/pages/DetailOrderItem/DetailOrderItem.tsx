import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { IOrder } from "../../../types/order";
import styles from "./DetailOrderItem.module.css";
import { getOrdersById } from "../../../services/order.service";
import Button from "../../ui/Button";
import NavbarAdmin from "../../ui/NavbarAdmin";
import { FaArrowLeft } from "react-icons/fa6";
import { FiPrinter } from "react-icons/fi";
import profilCowok from "../../../assets/profil-customer-cowok.jpg";
import { CiClock2 } from "react-icons/ci";

const DetailOrderItem = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState<IOrder | null>(null);
  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    const fetchOrder = async () => {
      const result = await getOrdersById(`${id}`);
      setOrders(result);
    };

    fetchOrder();
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <NavbarAdmin title="Detail Order" />

      <main className={styles.mainContent}>
        <section className={styles.header}>
          <Link to="/order">
            <Button type={"button"} className={styles.btnBackOrder}>
              <FaArrowLeft className={styles.iconLeftArrow} /> Back to Orders
            </Button>
          </Link>

          <Button
            type={"button"}
            onClick={() => {
              handlePrint();
            }}
            className={styles.btnPrinter}
          >
            <FiPrinter className={styles.iconPrinter} /> Print Receipe
          </Button>
        </section>

        <section className={styles.leftCard}>
          <div className={styles.containerHeaderLeftCard}>
            <div className={styles.serviceType}>
              <h6>SERVICE TYPE</h6>
              <div className={styles.titleOrderTable}>
                <h4>Dine-in Order</h4>
                <span>Table {orders?.table_number}</span>
              </div>
            </div>
            <div className={styles.customer}>
              <h6>CUSTOMER</h6>
              <h4>2 Guests</h4>
            </div>
          </div>

          <div className={styles.line}></div>

          <section className={styles.identCustomer}>
            <div className={styles.identLeft}>
              <img
                src={profilCowok}
                alt="Profil Customer Cowok"
                className={styles.avatar}
              />

              <div className={styles.customerDetails}>
                <div className={styles.nameAndBadge}>
                  <h6>{orders?.customer_name}</h6>
                  <span className={styles.badgeMember}>SILVER</span>
                </div>
                <p className={styles.phoneNumber}>+62 812-4910-9921</p>
              </div>
            </div>

            <div className={styles.rewardRight}>
              <span className={styles.rewardLabel}>REWARDS</span>
              <p className={styles.rewardPts}>1,450 pts</p>
            </div>
          </section>

          <section className={styles.cardTimeAndBarQueue}>
            <div className={styles.cardTime}>
              <h6>Preparation Time</h6>
              <div className={styles.minute}>
                <CiClock2 className={styles.iconClock}/>
                <p>~8 ~10 mins</p>
              </div>
            </div>
            <div className={styles.cardQueue}>
              <h6>Bar Queue Pos</h6>
              <div className={styles.queue}>
                <span className={styles.amberDot}></span>
                <p>#2 in Queue</p>
              </div>
            </div>
          </section>
        </section>

        <section className={styles.rightCard}></section>
      </main>
    </div>
  );
};

export default DetailOrderItem;
