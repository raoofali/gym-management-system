// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import MemberCard from './MemberCard/MemberCard';
// import AddMember from './AddMembers/AddMembers';

// const MemberList = () => {
//   const [members, setMembers] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchMembers = async () => {
//     const res = await axios.get(`http://localhost:5000/api/member/get-members?page=${page}&limit=9`);
//     setMembers(res.data.members);
//     setTotalPages(res.data.totalPages);
//   };

//   useEffect(() => {
//     fetchMembers();
//   }, [page]);

//   return (
//     <div>
//       <AddMember onMemberAdded={fetchMembers} />
//       <h2>Members</h2>
//       <div className="member-list">
//         {members.map(m => <MemberCard key={m._id} member={m} />)}
//       </div>
//       <div className="pagination">
//         <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
//         <span> Page {page} of {totalPages} </span>
//         <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
//       </div>
//     </div>
//   );
// };

// export default MemberList;
