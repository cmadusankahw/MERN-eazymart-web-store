import React, { useState, useEffect } from "react";
import db from "../../firebase";
import "./Orders.css";
import { useStateValue } from "../../StateProvider";
import Order from "./order/Order";

function Orders() {
  const [{ user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      {user ? (
        <>
          <h2>Orders by {user?.email}</h2>
          <div className="orders_order">
            {orders?.map((order) => (
              <Order order={order} />
            ))}
          </div>
        </>
      ) : (
        <div className="orders_noOrder">
          <h3> Please Sign-In to View your Orders</h3>
        </div>
      )}
    </div>
  );
}

export default Orders;
