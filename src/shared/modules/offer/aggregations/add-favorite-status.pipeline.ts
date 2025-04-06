import { Types } from 'mongoose';

export const addFavoriteStatusPipeline = (userId?: string, offerId?: string) => {
  if (!userId) {
    return [{ $addFields: { isFavorite: false } }];
  }
  return [
    {
      $lookup: {
        from: 'users',
        pipeline: [
          { $match: { '_id': new Types.ObjectId(userId) } },
          { $project: { favorites: 1 } }
        ],
        as: 'userFavorite'
      },
    },
    { $unwind: '$userFavorite' },
    { $addFields: { isFavorite: {
      $in: [offerId ? new Types.ObjectId(offerId) : '$_id' , '$userFavorite.favorites']
    } }},
    { $unset: 'userFavorite' }
  ];
};
