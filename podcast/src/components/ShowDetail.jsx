import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import SeasonDetail from './SeasonDetail';

const ShowDetail = ({ addFavorite }) => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchShowDetail = async () => {
//       try {
//         const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const data = await response.json();
//         setShow(data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchShowDetail();
//   }, [id]);

//   if (loading) return <LoadingSpinner />;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h2>{show.title}</h2>
//       <p>{show.description}</p>
//       <div className="seasons-list">
//         {show.seasons.map(season => (
//           <SeasonDetail key={season.id} season={season} addFavorite={addFavorite} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ShowDetail;

useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setShow(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error.message}</div>;
  if (!show) return <div>No show data found</div>;

  return (
    <div className="show-detail">
      <h2>{show.title}</h2>
      <p>{show.description}</p>
      <div>
        <h3>Seasons</h3>
        {show.seasons.map(season => (
          <SeasonDetail key={season.id} season={season} addFavorite={addFavorite} />
        ))}
      </div>
    </div>
  );
};

export default ShowDetail;