import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const UserInfoPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (router.query.id) {
      async function fetchUser() {
        const res = await fetch(`https://dummyjson.com/users/${router.query.id}`);
        const data = await res.json();
        setUser(data);
      }
      fetchUser();
    }
  }, [router.query.id]);

  return (
    <div>
      <h1>{user ? user.firstName : "Loading..."}</h1>
      <h1>{user ? user.email : "Loading..."}</h1>
    </div>
  );
};

export default UserInfoPage;