import React from "react";
import PropTypes from "prop-types";
import SongItem from "../song_item/song_item";
import "../song_list/song_list.scss";
import classnames from "classnames";

SongList.propTypes = {
  songList: PropTypes.array.isRequired,
  onSongClick: PropTypes.func,
};

SongList.defaultProps = {
  songList: [],
  onSongClick: null,
};

function SongList({ songList, onSongClick }) {
  const handleSongClick = (song, idx) => {
    if (!onSongClick) return;

    onSongClick(song, idx);

    // nếu truyền xuống thì gọi hàm onSongClick
  };

  return (
    <ul className="song-list">
      {songList.map((song, idx) => (
        <li
          key={song.id}
          className={classnames({
            "song-items": true,

            completed: song.status === "completed",
          })}
          onClick={() => handleSongClick(song, idx)}
        >
          <SongItem song={song} />

          {/* {song.name} */}
        </li>
      ))}
    </ul>
  );
}

export default SongList;
