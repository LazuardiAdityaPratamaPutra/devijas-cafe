import style from "./ListOrder.module.css";
import { useEffect, useState } from "react";
import { getOrders, updateOrders } from "../../../services/order.service";
import NavbarAdmin from "../../ui/NavbarAdmin";
import CardDashboardAdmin from "../../ui/CardDashboardAdmin";
import Button from "../../ui/Button";
import type { IOrder } from "../../../types/order";
import { Link } from "react-router";

const ListOrder = () => {
  const TABS = ["All Orders", "Pending", "Processing", "Completed"];
  const [orders, setOrders] = useState([]);
  const [refetchOrders, setRefetchOrders] = useState(true);
  const [activeTab, setActiveTab] = useState("All Orders");
  const filteredOrders = orders.filter((order: IOrder) => {
    if (activeTab === "Pending") return order.status === "PENDING";
    if (activeTab === "Processing") return order.status === "PROCESSING";
    if (activeTab === "Completed") return order.status === "COMPLETED";
    return true;
  });

  const handleUpdateProcessing = async (id: string) => {
    await updateOrders(id, { status: "COMPLETED" }).then(() =>
      setRefetchOrders(true),
    );
  };

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

        <table className={style.containerTable}>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Table</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order: IOrder) => {
              const totalItems = order.cart.reduce(
                (sum, item) => sum + item.quantity,
                0,
              );

              return (
                <tr key={order.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{order.id}</td>
                  <td>{order.customer_name}</td>
                  <td>{order.table_number}</td>
                  <td>{totalItems}</td>
                  <td>{order.total.toLocaleString("id-ID")} $</td>
                  <td>
                    <span
                      className={`${style.badge} ${style[order.status.toLocaleLowerCase()]}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    {new Date(order.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>
                    <Link to={`/order/${order.id}`}>
                      <Button className={style.btnDetail} type="button">
                        Detail
                      </Button>
                    </Link>
                    {order.status === "PROCESSING" && (
                      <Button
                        type="button"
                        className={style.btnCompleted}
                        onClick={() => handleUpdateProcessing(order.id)}
                      >
                        Completed
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ListOrder;
