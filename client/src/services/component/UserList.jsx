import User from "../component/User";

function UserList({ users, user, children }) {
  return (
    <div>
      {children}
      {users.map((other) => (
        <User
          key={other.id}
          id={other.id}
          isUser={other.id === user.id}
          name={other.name}
          cursor={other.cursor}
        />
      ))}
    </div>
  );
}

export default UserList;
