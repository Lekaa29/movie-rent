
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

const VhsCard = ({ vhs }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/vhs/${vhs.id}`)}
      className="group cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl mb-4">
        {vhs.coverImageUrl ? (
          <img 
            src={vhs.coverImageUrl} 
            alt={vhs.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
            <span className="text-slate-600 text-sm uppercase tracking-wider">No Image</span>
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-500" />
        
        {/* Availability Badge */}
        <div className="absolute top-4 right-4">
          <div className={`px-3 py-1.5 rounded-full backdrop-blur-md text-xs uppercase tracking-wider font-medium ${
            vhs.availableCopies > 0 
              ? 'bg-green-500 bg-opacity-20 text-green-300 border border-green-400 border-opacity-30' 
              : 'bg-red-500 bg-opacity-20 text-red-300 border border-red-400 border-opacity-30'
          }`}>
            {vhs.availableCopies > 0 ? `${vhs.availableCopies} Available` : 'Out of Stock'}
          </div>
        </div>

        {/* Rating Badge (if exists) */}
        {vhs.averageRating > 0 && (
          <div className="absolute top-4 left-4">
            <div className="px-3 py-1.5 rounded-full backdrop-blur-md bg-white bg-opacity-10 border border-white border-opacity-20 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span className="text-white text-xs font-medium">
                {vhs.averageRating.toFixed(1)}
              </span>
              <span className="text-white text-xs opacity-60">
                ({vhs.reviewCount})
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        {/* Title */}
        <h3 className="text-white text-lg font-medium leading-tight group-hover:opacity-70 transition-opacity duration-300">
          {vhs.title}
        </h3>

        {/* Info Row */}
        <div className="flex items-center gap-2 text-white text-sm opacity-60">
          <span>{vhs.director}</span>
          <span>•</span>
          <span>{vhs.releaseYear}</span>
        </div>

        {/* Genre */}
        <div className="inline-block">
          <span className="text-xs uppercase tracking-wider px-3 py-1 rounded-full border border-white border-opacity-30 text-white opacity-60">
            {vhs.genre}
          </span>
        </div>

        {/* Price */}
        <div className="pt-2">
          <p className="text-white text-xl font-medium">
            ${vhs.dailyRentalPrice}
            <span className="text-sm opacity-60 font-normal ml-1">/day</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VhsCard;