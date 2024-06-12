import { UserButton, useUser } from "@clerk/remix";

export default function Example() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return <div>Hello,  <p>Name: {user.firstName} {user.lastName}</p>
  <p>Email: {user.emailAddresses[0].emailAddress}</p>
  <p>Username: {user.username}</p>
  <UserButton/></div>;
}