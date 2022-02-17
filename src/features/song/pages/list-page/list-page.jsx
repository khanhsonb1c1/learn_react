import React, { useState } from "react";
import PropTypes from "prop-types";
import SongList from "../../components/song_list/song_list"
import SongForm from "../../components/song_form/song_form";

SongFeature.propTypes = {};

function SongFeature(props) {
  const initsongList = [
    {
      id: 1,
      name: "son",
      thumbnailUrl:
        "http://3.bp.blogspot.com/-vMosNXgUys4/VlKbfJwZOVI/AAAAAAAAFo4/LAkvnoxOn38/s640/ashe2.jpg",
      status: "new",
    },

    {
      id: 2,
      name: "thu",
      thumbnailUrl:
        "http://3.bp.blogspot.com/-NrhYuNzK0L4/UsY3ySL19VI/AAAAAAAAESw/jMbnv9KsEoM/s1600/akali__the_fist_of_shadow_by_yanniplum-d2xufa0.png",
      status: "completed",
    },

    {
      id: 3,
      name: "nhan",
      thumbnailUrl:
        "http://2.bp.blogspot.com/-yuz1LNpMuew/UzU_nshYJiI/AAAAAAAADS8/KQk-NryzUus/s1600/130622111158.jpg",
      status: "new",
    },

    {
      id: 4,
      name: "vu",
      thumbnailUrl:
        "http://3.bp.blogspot.com/-bL3AoS5m5hw/UzU_sFH2AqI/AAAAAAAADTc/JKmmZ46ftSk/s1600/130622112956.jpg",
      status: "new",
    },
  ];

  const [songList, setSongList] = useState(initsongList);
  const [filteredStatus, setFilteredStatus] = useState("all");

  const handleSongClick = (song, idx) => {
    // clone current array to the new one
    const newSongList = [...songList];

    console.log(song, idx);
    // toggle state
    newSongList[idx] = {
      ...newSongList[idx],
      status: newSongList[idx].status === "new" ? "completed" : "new",
      // update song list
    };

    setSongList(newSongList);
  };

  const handleShowAllClick = () => {
    setFilteredStatus("all");
  };

  const handleShowCompletedClick = () => {
    setFilteredStatus("completed");
  };

  const handleShowNewClick = () => {
    setFilteredStatus("new");
  };

  const renderSongList = songList.filter(
    (song) => filteredStatus === "all" || filteredStatus === song.status
  );

  console.log(renderSongList);



  const handleSongFormSubmit =(value) => {
    console.log('Form submit: ', value);
  };



  return (
    <div>

      <h3>what song ? </h3>
      <SongForm onSubmit={handleSongFormSubmit}/>
      <h3>Song List</h3>
      <SongList songList={renderSongList} onSongClick={handleSongClick} />

      <div>
        <button onClick={handleShowAllClick}>Show all</button>
        <button onClick={handleShowCompletedClick}>Show completed</button>
        <button onClick={handleShowNewClick}>Show new</button>
      </div>
    </div>
  );
}

export default SongFeature;
