import styled from "styled-components";
import { useState } from "react";
import { people_data } from "./constants/peopleData.js";
import { group_data } from "./constants/groupData.js";
import {
  BsShareFill,
  BsToggleOff,
  BsToggleOn,
  BsLink45Deg,
  BsQuestionCircle,
} from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import { FaGlobeAfrica } from "react-icons/fa";

function App() {
  const [isShareClicked, setIsShareClicked] = useState(false);
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [isToggleButtonClicked, setIsToggleButtonClicked] = useState(false);
  const [mutablePeopleData, setMutablePeopleData] = useState(people_data);
  const [defaultPeopleData, setDefaultPeopleData] = useState(people_data);
  const [mutableGroupData, setMutableGroupData] = useState(group_data);
  const [defaultGroupData, setDefaultGroupData] = useState(group_data);
  const [search, setSearch] = useState("");
  const [popUpState, setPopUpState] = useState(false);
  const [currentAccess, setCurrentAccess] = useState(null);
  const accessList = ["Full access", "Can edit", "Can view", "No access"];

  const searchPeopleHandler = () => {
    const searchPeopleData = defaultPeopleData.filter((item) => {
      const searchNameDB =
        item.first.toLowerCase() + item.last.toLocaleLowerCase();
      const inputSearch = search.toLowerCase();
      return searchNameDB.includes(inputSearch) === true;
    });

    setMutablePeopleData(searchPeopleData);
  };

  const searchGroupHandler = () => {
    const searchGroupData = defaultGroupData.filter((item) => {
      const searchNameDB = item.first.toLowerCase();
      const inputSearch = search.toLowerCase();
      return searchNameDB.includes(inputSearch) === true;
    });
    setMutableGroupData(searchGroupData);
  };

  const selectPeopleHandler = (passedId) => {
    const updatedPeopleData = defaultPeopleData.map((item) => {
      if (passedId === item.id && item.isSelected === "Select") {
        return { ...item, isSelected: "Unselect" };
      } else if (passedId === item.id && item.isSelected === "Unselect") {
        return { ...item, isSelected: "Select" };
      } else {
        return item;
      }
    });
    const updatedPeopleDataForShow = mutablePeopleData.map((item) => {
      if (passedId === item.id && item.isSelected === "Select") {
        return { ...item, isSelected: "Unselect" };
      } else if (passedId === item.id && item.isSelected === "Unselect") {
        return { ...item, isSelected: "Select" };
      } else {
        return item;
      }
    });
    setDefaultPeopleData(updatedPeopleData);
    setMutablePeopleData(updatedPeopleDataForShow);
  };

  const selectGroupHandler = (passedId) => {
    const updatedGroupData = defaultGroupData.map((item) => {
      if (passedId === item.id && item.isSelected === "Select") {
        return { ...item, isSelected: "Unselect" };
      } else if (passedId === item.id && item.isSelected === "Unselect") {
        return { ...item, isSelected: "Select" };
      } else {
        return item;
      }
    });
    const updatedGroupDataForShow = mutableGroupData.map((item) => {
      if (passedId === item.id && item.isSelected === "Select") {
        return { ...item, isSelected: "Unselect" };
      } else if (passedId === item.id && item.isSelected === "Unselect") {
        return { ...item, isSelected: "Select" };
      } else {
        return item;
      }
    });
    setDefaultGroupData(updatedGroupData);
    setMutableGroupData(updatedGroupDataForShow);
  };

  const shareClickHandler = () => {
    if (isShareClicked === true) {
      setIsShareClicked(false);
      setDefaultPeopleData(people_data);
      setDefaultPeopleData(group_data);
      setIsInputClicked(false);
    } else {
      setIsShareClicked(true);
    }
  };

  const popUpHandler = () => {
    setTimeout(() => {
      setPopUpState(false);
    }, 1000);
  };

  const changeAccessHandler = (passedId, accessItem) => {
    const updatedPeopleData = defaultPeopleData.map((item) => {
      if (passedId === item.id) {
        return { ...item, accessPermisson: accessItem };
      } else {
        return item;
      }
    });
    const updatedPeopleDataForShow = mutablePeopleData.map((item) => {
      if (passedId === item.id) {
        return { ...item, accessPermisson: accessItem };
      } else {
        return item;
      }
    });
    setDefaultPeopleData(updatedPeopleData);
    setMutablePeopleData(updatedPeopleDataForShow);
  };

  return (
    <PrimaryDiv className="App">
      {popUpState ? (
        <PopUpDiv>
          <H4>Done🥳</H4>
        </PopUpDiv>
      ) : null}
      <PrimaryContainer>
        <Share
          onClick={() => {
            // setIsShareClicked(true);
            shareClickHandler();
          }}
        >
          Share
          <BsShareFill />
        </Share>
        {isShareClicked ? (
          <ShareDialouge>
            <InfoSecShare1>
              <InfoSecShare1Div1>
                <FaGlobeAfrica size="1.5rem" />
                <InfoSecShare1Div2>
                  <H4>Share to web</H4>
                  <P1>Publish and share link with anyone</P1>
                </InfoSecShare1Div2>
              </InfoSecShare1Div1>
              {isToggleButtonClicked ? (
                <BsToggleOn
                  onClick={() => {
                    setIsToggleButtonClicked(false);
                  }}
                  size="1.5rem"
                  cursor="pointer"
                />
              ) : (
                <BsToggleOff
                  onClick={() => {
                    setIsToggleButtonClicked(true);
                  }}
                  size="1.5rem"
                  cursor="pointer"
                />
              )}
            </InfoSecShare1>
            <SearchBoxSection>
              <InputSectionToClick
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  searchPeopleHandler();
                  searchGroupHandler();
                }}
                onClick={() => {
                  setIsInputClicked(true);
                }}
                placeholder="People, emails, groups"
              ></InputSectionToClick>
              <InviteButton
                onClick={() => {
                  setIsShareClicked(false);
                  setDefaultPeopleData(people_data);
                  setDefaultPeopleData(group_data);
                  setIsInputClicked(false);
                  setPopUpState(true);
                  popUpHandler();
                }}
              >
                Invite
              </InviteButton>
            </SearchBoxSection>
          </ShareDialouge>
        ) : null}
        {isInputClicked ? ( //InputClickedCondition
          <SearchedDialouge>
            <CurrentSelectionSection>
              {defaultPeopleData.map((item) => {
                return (
                  <SelectedList key={item.id}>
                    {item.isSelected === "Unselect" ? (
                      <SelectedListItem>
                        <SelectedUserImage
                          src={item.picture}
                        ></SelectedUserImage>
                        <H6>
                          {item.first} {item.last}
                        </H6>
                        <GrFormClose
                          style={{ height: "1rem", width: "1rem" }}
                          onClick={() => {
                            selectPeopleHandler(item.id);
                          }}
                        />
                      </SelectedListItem>
                    ) : null}
                  </SelectedList>
                );
              })}
              {defaultGroupData.map((item) => {
                return (
                  <SelectedList key={item.id}>
                    {item.isSelected === "Unselect" ? (
                      <SelectedListItem>
                        <SelectedUserImage
                          src={item.picture}
                          style={{ filter: "invert()" }}
                        ></SelectedUserImage>
                        <H6>{item.first}</H6>
                        <GrFormClose
                          style={{ height: "1.3rem", width: "1.3rem" }}
                          onClick={() => {
                            selectGroupHandler(item.id);
                          }}
                        />
                      </SelectedListItem>
                    ) : null}
                  </SelectedList>
                );
              })}
            </CurrentSelectionSection>
            <PeopleSearchSection>
              <H4>People</H4>
              <SearchList>
                {mutablePeopleData.map((item) => {
                  return (
                    <PeopleListItem key={item.id}>
                      <UserDataLeft>
                        <UserImage src={item.picture}></UserImage>
                        <P1>
                          {item.first} {item.last}
                        </P1>
                      </UserDataLeft>
                      <UserAccessData>
                        <SelectButton
                          onClick={() => {
                            selectPeopleHandler(item.id);
                          }}
                        >
                          {item.isSelected}
                        </SelectButton>
                        <AccessSection>
                          <AccessButton
                            onClick={() => {
                              currentAccess === item.id
                                ? setCurrentAccess(null)
                                : setCurrentAccess(item.id);
                            }}
                          >
                            {item.accessPermisson}
                          </AccessButton>
                          {currentAccess === item.id
                            ? accessList.map((accessItem) => {
                                return (
                                  <AccessListItem
                                    onClick={() => {
                                      setCurrentAccess(null);
                                      changeAccessHandler(item.id, accessItem);
                                      console.log(defaultPeopleData);
                                    }}
                                  >
                                    {accessItem}
                                  </AccessListItem>
                                );
                              })
                            : null}
                        </AccessSection>
                      </UserAccessData>
                    </PeopleListItem>
                  );
                })}
              </SearchList>
            </PeopleSearchSection>
            <GroupSearchSection>
              <H4 style={{ borderTop: "solid 2px" }}>Groups</H4>
              <SearchList>
                {mutableGroupData.map((item) => {
                  return (
                    <GroupListItem>
                      <GroupDataLeft>
                        <UserImage
                          src={item.picture}
                          style={{ filter: "invert()" }}
                        ></UserImage>
                        <P1>{item.first}</P1>
                      </GroupDataLeft>
                      <SelectButton
                        onClick={() => {
                          selectGroupHandler(item.id);
                        }}
                      >
                        {item.isSelected}
                      </SelectButton>
                    </GroupListItem>
                  );
                })}
              </SearchList>
            </GroupSearchSection>
            <CancelDiv>
              <CancelButton
                onClick={() => {
                  setIsShareClicked(false);
                  setDefaultPeopleData(people_data);
                  setDefaultPeopleData(group_data);
                  setIsInputClicked(false);
                }}
              >
                Cancel
              </CancelButton>
            </CancelDiv>
          </SearchedDialouge>
        ) : isShareClicked ? (
          <InfoSecShare2>
            <InfoSecShare1Div1>
              <BsQuestionCircle />
              <InfoSecShare1Div2>
                <P1>learn about sharing</P1>
              </InfoSecShare1Div2>
            </InfoSecShare1Div1>
            <BsLink45Deg cursor="pointer" />
          </InfoSecShare2>
        ) : null}
      </PrimaryContainer>
    </PrimaryDiv>
  );
}

//******************* STYLED COMPONENTS *******************

//*********** styled Div ***********

const PrimaryDiv = styled.div`
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Share = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  background-color: black;
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const PrimaryContainer = styled.div`
  height: fit-content;
  width: 20rem;
  margin: 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;
  background-color: transparent;
  gap: 1rem;
  border: solid 0.1rem;
  border-radius: 1rem;
  padding-top: 1.5rem;
  padding-bottom: 2rem;
`;

const ShareDialouge = styled.div`
  width: 100%;
  height: 12vh;
  background-color: transparent;
`;

const SearchedDialouge = styled.div`
  width: 100%;
  height: 35vh;
  background-color: transparent;
`;

const SearchBoxSection = styled.div`
  width: 100%;
  height: 6vh;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: baseline;
  align-items: center;
`;

const InfoSecShare1 = styled.div`
  width: 100%;
  height: 8.5vh;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const InfoSecShare2 = styled.div`
  width: 100%;
  height: 5vh;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const InfoSecShare1Div1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const InfoSecShare1Div2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: baseline;
`;

const CurrentSelectionSection = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: baseline;
  align-items: center;
  background-color: transparent;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const PeopleSearchSection = styled.div`
  width: 100%;
  height: 42.5%;
`;

const GroupSearchSection = styled.div`
  width: 100%;
  height: 42.5%;
`;

const CancelDiv = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

const SearchList = styled.div`
  width: 100%;
  height: 80%;
  background-color: white;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const SelectedList = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: baseline;
  align-items: center;
`;

const PeopleListItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const UserDataLeft = styled.div`
  display: flex;
  justify-content: baseline;
  align-items: center;
  gap: 1rem;
`;

const GroupDataLeft = styled.div`
  display: flex;
  justify-content: baseline;
  align-items: center;
  gap: 1rem;
`;

const UserAccessData = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
`;

const GroupListItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SelectedListItem = styled.div`
  height: 1.3rem;
  width: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  margin-right: 0.3rem;
  background-color: transparent;
  border: solid 1px;
  border-radius: 0.5rem;
`;

const PopUpDiv = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
`;

const AccessListItem = styled.div`
  display: flex;
  justify-content: baseline;
  align-items: center;
  padding-left: 0.35rem;
  padding-top: 0.1rem;
  font-size: 0.7rem;
  background-color: rgba(0, 0, 0, 0.1);
  width: 80%;
  border-radius: 0.2rem;
  cursor: pointer;
`;

const AccessSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: baseline;
  gap: 0.2rem;
`;

//*********** Styled Input ***********

const InputSectionToClick = styled.input`
  height: 85%;
  width: 80%;
  border-radius: 0.5rem;
  border: solid 1px;
  padding-left: 1rem;
`;

//*********** Styled Button ***********

const InviteButton = styled.button`
  height: 100%;
  width: 20%;
  margin: 0;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

const CancelButton = styled.button`
  margin: 0.5rem;
  background-color: transparent;
  outline: none;
  border: none;
  margin-right: 0;
  cursor: pointer;
`;

const SelectButton = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
`;

const AccessButton = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  position: relative;
`;

//*********** Styled Heading ***********

const H4 = styled.h4`
  margin: 0;
  padding: 0;
`;
const H6 = styled.h6`
  margin: 0;
  padding: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

//*********** Styled Heading ***********

const P1 = styled.p`
  margin: 0;
  padding: 0;
`;

//*********** Styled Img ***********

const UserImage = styled.img`
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
`;

const SelectedUserImage = styled.img`
  border-radius: 50%;
  height: 1.2rem;
  width: 1.2rem;
  margin-right: 0.2rem;
`;

export default App;
