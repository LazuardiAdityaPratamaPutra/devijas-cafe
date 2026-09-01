import { Icon } from "@iconify/react";
import type { ReactNode } from "react";
import styles from "./CardDashboardAdmin.module.css";

interface CardOrders {
  childDetail: ReactNode;
  childTotal: ReactNode;
  color?: string;
  iconName?: string;
}

const CardDashboardAdmin = (props: CardOrders) => {
  const {
    childDetail,
    childTotal,
    color = "#4F46E5",
    iconName = "fluent:chart-multiple-20-regular",
  } = props;

  return (
    <div className={styles.card}>
      <div>
        <p className={styles.detailText}>{childDetail}</p>
        <h2 className={styles.totalText}>{childTotal}</h2>
      </div>
      <Icon 
        icon={iconName} 
        className={styles.icon} 
        style={{ color: color }} 
      />
    </div>
  );
};

export default CardDashboardAdmin;