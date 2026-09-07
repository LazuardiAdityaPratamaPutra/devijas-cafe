import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { IOrder } from "../../../types/order";
import styles from './DetailOrderItem.module.css'
import { getOrdersById } from "../../../services/order.service";
import Button from "../../ui/Button";

const DetailOrderItem = () => {
  const {id} = useParams();
  const [orders, setOrders] = useState<IOrder | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const result = await getOrdersById(`${id}`);
      setOrders(result);
    } 

    fetchOrder();
  }, []);

  return (
    <main className={styles.main}>
      <section className={styles.header}>
        <h1>Detail Order</h1>
        <Link to='/order'>
          <Button type={'button'}>Back</Button>
        </Link>
      </section>
    </main>
  )
}

export default DetailOrderItem;