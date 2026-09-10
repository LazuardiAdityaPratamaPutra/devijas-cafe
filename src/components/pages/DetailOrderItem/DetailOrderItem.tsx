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
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <h6>SERVICE TYPE</h6>
              <div className={styles.titleOrderAndCustomer}>
                <div className={styles.titleOrder}>
                  <h6>Dine-in Order</h6>
                  <span>Table {orders?.table_number}</span>
                </div>
                <div className={styles.titleCustomerOrder}>
                  <h6>CUSTOMER</h6>
                  <span>2 Guests</span>
                </div>
              </div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.customerInfo}>
              <div className={styles.profileCustomer}>
                <img src={profilCowok} alt="Profile Customer Cowok" />
                <div className={styles.customerName}>
                  <p>{orders?.customer_name}</p>
                  <span className={styles.memberInfo}>SILVER</span>
                </div>
                <span>+62 821-4927-5473</span>
              </div>
              <div className={styles.rewardInfo}>
                <h5>REWARDS</h5>
                <span>1,450 pts</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.rightCard}></section>
      </main>
    </div>
  );
};

export default DetailOrderItem;
