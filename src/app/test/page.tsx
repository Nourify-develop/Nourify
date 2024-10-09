"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore"; // Firestore methods
import { getFirestore } from "firebase/firestore";
import app from "../../lib/firebaseConfig"; // Firebase configuration

const Users = () => {
  const db = getFirestore(app);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData: any[] = [];
      querySnapshot.forEach((doc) => {
        usersData.push({ ...doc.data(), id: doc.id });
      });
      setUsers(usersData);
    };

    fetchUsers();
  }, [db]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Registered Users</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="list-disc">
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.firstName} {user.lastName}</strong> - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;
