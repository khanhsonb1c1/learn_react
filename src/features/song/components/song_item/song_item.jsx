import React from 'react';
import PropTypes from 'prop-types';
import './song_item.scss'

SongItem.propTypes = {

    song: PropTypes.object.isRequired,
    
};

function SongItem({song}) {
    return (
        <div className='song'>
            <div className='song__thumbnail'>

                <img src={song.thumbnailUrl} alt={song.name} />

            </div>

            <p className='song__name'>{song.name}</p>
            
        </div>
    );
}

export default SongItem;