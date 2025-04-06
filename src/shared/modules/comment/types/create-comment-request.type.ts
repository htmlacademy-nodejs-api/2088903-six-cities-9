import { Request } from 'express';

import { ParamOfferId } from '../../offer/index.js';
import { CreateCommentDTO } from '../dto/create-comment.dto.js';

export type CreateCommentRequest = Request<ParamOfferId, unknown, CreateCommentDTO>
