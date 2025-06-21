import styled from "styled-components";
import { useGet } from "../../utils/hooks/useCustomQuery";
import { ENDPOINTS } from "../../utils/constants/Endpoints";
import { Link } from "react-router-dom";

const UserList = () => {
  const { data: users, isLoading } = useGet("users", ENDPOINTS.users);

  return (
    <UserListWrapper>
      <NavigatorContainer>
        <StyledLink to={"/calculator"}>Previous</StyledLink>
      </NavigatorContainer>
      <Header>User List</Header>
      {isLoading ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : (
        <TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Name</TableHeader>
                <TableHeader>Gender</TableHeader>
                <TableHeader>Age</TableHeader>
                <TableHeader>Height</TableHeader>
                <TableHeader>Weight</TableHeader>
                <TableHeader>BMI</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {users &&
                users.map((user, index) => (
                  <TableRow key={index}>
                    <TableData>
                      {user.name} {user.surname}
                    </TableData>
                    <TableData>{user.gender ? "Male" : "Female"}</TableData>
                    <TableData>{user.age}</TableData>
                    <TableData>{user.height} cm</TableData>
                    <TableData>{user.weight} kg</TableData>
                    <TableData>{user.bmi}</TableData>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableWrapper>
      )}
    </UserListWrapper>
  );
};

const StyledLink = styled(Link)`
  padding: 10px 20px;
  color: #fff;
  background-color: #18bd5b;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 5px;
  display: inline-block;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #16aa52;
    transform: translateY(3px);
  }

  &:active {
    background-color: #149e47;
    transform: translateY(0);
  }
`;

const NavigatorContainer = styled.div`
  padding: 10px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -0%);
  width: 90%;
  display: flex;
  justify-content: space-between;
`;

const UserListWrapper = styled.div`
  position: relative;
  padding: 50px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Header = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #333;
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.5rem;
  color: #999;
`;

const TableWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const TableHead = styled.thead`
  background-color: #18bd5b;
  color: white;
`;

const TableRow = styled.tr``;

const TableHeader = styled.th`
  padding: 15px;
  font-size: 1.1rem;
  text-align: left;
  font-weight: 600;
`;

const TableBody = styled.tbody``;

const TableData = styled.td`
  padding: 12px 15px;
  text-align: left;
  font-size: 1rem;
  color: #555;
  border-top: 1px solid #e0e0e0;

  &:hover {
    background-color: #f9f9f9;
  }
`;

export default UserList;
