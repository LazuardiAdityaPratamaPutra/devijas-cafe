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
import { RiDiscountPercentFill } from "react-icons/ri";

const DetailOrderItem = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState<IOrder | null>(null);
  const handlePrint = () => {
    window.print();
  };
  const [selectItemModifiers, setSelectedItemModifiers] = useState<String[]>(
    [],
  );
  const itemModifiers = [
    {
      name: "Extra Shot",
      price: "+ Rp 5.000",
    },
    {
      name: "Oat Milk Swap",
      price: "+ Rp 6.000",
    },
    {
      name: "Less Ice 50%",
      price: "Standar Ice",
    },
    {
      name: "Extra Hot",
      price: "+ Rp 0",
    },
    {
      name: "Vanilla Bean Syrup",
      price: "+ Rp 4.000",
    },
    {
      name: "Takeaway Packaging",
      price: "+ Rp 2.000",
    },
  ];

  const handleModifiersClick = (modifier: string) => {
    setSelectedItemModifiers((prev) =>
      prev.includes(modifier)
        ? prev.filter((item) => item !== modifier)
        : [...prev, modifier],
    );
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
          <div className={styles.leftCardIdent}>
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

            <div className={styles.identCustomer}>
              <div className={styles.identLeft}>
                <img
                  src={profilCowok}
                  alt="Profil Customer Cowok"
                  className={styles.avatar}
                />

                <div className={styles.customerDetails}>
                  <div className={styles.nameAndBadge}>
                    <h6>{orders?.customer_name}</h6>
                    <span className={styles.badgeMember}>GOLD</span>
                  </div>
                  <p className={styles.phoneNumber}>+62 812-4910-9921</p>
                </div>
              </div>

              <div className={styles.rewardRight}>
                <span className={styles.rewardLabel}>REWARDS</span>
                <p className={styles.rewardPts}>1,450 pts</p>
              </div>
            </div>

            <div className={styles.cardTimeAndBarQueue}>
              <div className={styles.cardTime}>
                <h6>Preparation Time</h6>
                <div className={styles.minute}>
                  <CiClock2 className={styles.iconClock} />
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
            </div>
          </div>

          <div className={styles.containerCardModifiers}>
            <div className={styles.headerModifiers}>
              <h3>QUICK MODIFIERS & ADD-ONS</h3>
              <span>FAST TOUCH</span>
            </div>

            <div className={styles.line}></div>

            <div className={styles.cardQuickModifiers}>
              {itemModifiers.map((modifier) => {
                const isSelected = selectItemModifiers.includes(modifier.name);
                return (
                  <div
                    key={modifier.name}
                    className={`${styles.cardItemModifiers} ${isSelected ? styles.backgroundCardBrown : ""}`}
                    onClick={() => handleModifiersClick(modifier.name)}
                  >
                    <h6>{modifier.name}</h6>
                    <p>{modifier.price}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.containerCardLoyalty}>
            <div className={styles.headerLoyalty}>
              <div className={styles.titleLoyalty}>
                <h3>Loyalty Rewards & Perks</h3>
                <p>Gold Tier Member • 1,450 pts</p>
              </div>
              <div className={styles.badgeTitle}>
                <span>GOLD</span>
              </div>
            </div>

            <div className={styles.line}></div>

            <div className={styles.cardFreeReserve}>
              <div className={styles.headerFreeReserve}>
                <div className={styles.titleFreeReserve}>
                  <h3>Free Reserve Espresso</h3>
                  <p>Tier milestone unlock at 1,500 pts (1,450 / 1,500)</p>
                </div>
                <div className={styles.pointFreeReserve}>
                  <span>50 pts away</span>
                </div>
              </div>

              <div className={styles.linePointGrey}>
                <div className={styles.linePointOrange}></div>
              </div>

              <div className={styles.containerDiscountCard}>
                <div className={styles.contentLeftDiscount}>
                  <RiDiscountPercentFill className={styles.iconDiscount} />
                  <div className={styles.detailDiscount}>
                    <h6>10% Gold Member Perk</h6>
                    <p>Discount removed for this order</p>
                  </div>
                  <span>Paused</span>
                </div>
                <div className={styles.contentRightDiscount}>
                  <label className={styles.switch}>
                    <input type="checkbox" />
                    <span className={`${styles.slider} ${styles.round}`}></span>
                  </label>
                </div>
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
