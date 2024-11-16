import ProfileSegments from "../Sections/Profile/ProfileSegments";

export default function ProfilePage() {
  return (
    <>
      <section className="w-full pb-32 bg-[#EAEAF5] flex flex-col gap-0 justify-center items-start">
        <ProfileSegments />
      </section>
    </>
  );
}

// export default function Profile() {
  // const { user, loading } = useAuth();
  // const router = useRouter();
  // const [hygraphUser, setHygraphUser] = useState(null);

  // useEffect(() => {
  //   if (!loading && !user) {
  //     router.push("/login"); // Redirect to login if not authenticated
  //   }

  //   if (user && user.email) {
  //     getUserDataByEmail(user.email).then((data) => {
  //       setHygraphUser(data);
  //     });
  //   }
  // }, [user, loading, router]);

  // if (loading) return <p>Loading...</p>;

//   return (
//     <div className="p-4">
//       {user && hygraphUser ? (
//         <>
//           <h1>Welcome, {hygraphUser.name || "User"}!</h1>
//           <p>Email: {hygraphUser.email}</p>
//           <p>Username: {hygraphUser.username || "Not set"}</p>
//           <p>Hygraph ID: {hygraphUser.id}</p>
//           <p>Verified: {hygraphUser.isVerified ? "Yes" : "No"}</p>
//           <p>Date of Birth: {hygraphUser.dateOfBirth || "Not provided"}</p>
//           <p>
//             Attending Nursery: {hygraphUser.attendingNursery ? "Yes" : "No"}
//           </p>

//           {hygraphUser.profilePicture?.url && (
//             <img
//               src={hygraphUser.profilePicture.url}
//               alt="Profile Picture"
//               className="w-20 h-20 rounded-full"
//             />
//           )}

//           <h2>Partner</h2>
//           {hygraphUser.partner ? (
//             <p>
//               Name: {hygraphUser.partner.name},
//               <br />
//               Email: {hygraphUser.partner.email}
//             </p>
//           ) : (
//             <p>No partner information available.</p>
//           )}

//           <h2>Badges</h2>
//           {hygraphUser.myBadge?.length > 0 ? (
//             hygraphUser.myBadge.map((badge) => (
//               <div key={badge.name}>
//                 <p>{badge.name}</p>
//                 <p>{badge.description}</p>
//                 {badge.icon?.url && (
//                   <img
//                     src={badge.icon.url}
//                     alt={badge.name}
//                     className="w-10 h-10"
//                   />
//                 )}
//               </div>
//             ))
//           ) : (
//             <p>No badges earned yet.</p>
//           )}

//           <h2>Activities</h2>
//           {hygraphUser.myActivity?.length > 0 ? (
//             hygraphUser.myActivity.map((activity) => (
//               <div key={activity.title}>
//                 <p>{activity.title}</p>
//                 <p>{activity.description}</p>
//               </div>
//             ))
//           ) : (
//             <p>No activities available.</p>
//           )}

//           <h2>Milestones Completed</h2>
//           {hygraphUser.milestoneCompleted?.length > 0 ? (
//             hygraphUser.milestoneCompleted.map((milestone) => (
//               <div key={milestone.title}>
//                 <p>{milestone.title}</p>
//                 <p>Date Achieved: {milestone.dateAchieved}</p>
//               </div>
//             ))
//           ) : (
//             <p>No milestones completed yet.</p>
//           )}

//           <h2>Payment Methods</h2>
//           {hygraphUser.myPaymentMethod?.length > 0 ? (
//             hygraphUser.myPaymentMethod.map((payment, index) => (
//               <div key={index}>
//                 <p>Card Type: {payment.cardType}</p>
//                 <p>Last Four Digits: {payment.lastFourDigits}</p>
//                 <p>Expiry Date: {payment.expiryDate}</p>
//               </div>
//             ))
//           ) : (
//             <p>No payment methods added.</p>
//           )}
//         </>
//       ) : (
//         <p>You are not logged in.</p>
//       )}
//     </div>
//   );
// }
