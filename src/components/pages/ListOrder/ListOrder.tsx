import style from "./ListOrder.module.css";
import { useEffect, useState } from "react";
import { getOrders } from "../../../services/order.service";
import NavbarAdmin from "../../ui/NavbarAdmin";
import CardDashboardAdmin from "../../ui/CardDashboardAdmin";
import Button from "../../ui/Button";

const ListOrder = () => {
  const TABS = ["All Orders", "Pending", "Completed", "Cancelled"];
  const [orders, setOrders] = useState([]);
  const [refetchOrders, setRefetchOrders] = useState(true);
  const [activeTab, setActiveTab] = useState("All Orders");

  useEffect(() => {
    if (refetchOrders) {
      const fetchOrders = async () => {
        const result = await getOrders();
        setOrders(result.data);
        setRefetchOrders(false);
      };
      fetchOrders();
    }
  }, [refetchOrders]);

  return (
    <div className={style.pageWrapper}>
      <NavbarAdmin />

      <main className={style.mainContent}>
        <header className={style.header}>
          <h1>Orders List</h1>
          <Button type="submit" className={style.btn}>
            Create Order
          </Button>
        </header>

        <section className={style.cardSection}>
          <CardDashboardAdmin
            childDetail={"Active Orders"}
            childTotal={"1.014"}
          />
          <CardDashboardAdmin
            childDetail={"Pending Received"}
            childTotal={"462"}
            color={"#EAB308"}
            iconName={"lucide:clock"}
          />
          <CardDashboardAdmin
            childDetail={"Unfulfilled"}
            childTotal={"462"}
            color={"#EF4444"}
            iconName={"lucide:package-x"}
          />
          <CardDashboardAdmin
            childDetail={"Fulfilled"}
            childTotal={"462"}
            color={"#10B981"}
            iconName={"lucide:package-check"}
          />
        </section>

        <section className={style.tabContainer}>
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`${style.tabButton} ${activeTab === tab ? style.active : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </section>
      </main>
    </div>
  );
};

export default ListOrder;
