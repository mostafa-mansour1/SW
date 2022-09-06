import { Request, Response, Router } from 'express';
import StatusCodes from 'http-status-codes';
import { getAllPeople, getOnePeople } from '../../services/people.services';

// Constants
const router = Router();

const people = async (req: Request, res: Response) => {
    const req_id = Number(req?.query?.id);
    const req_page = Number(req?.query?.page);
    const page = Number.isNaN(req_page) ? 1 : req_page;

    let output = {};

    if (!Number.isNaN(req_id))
        output = await getOnePeople(req_id);
    else
        output = await getAllPeople(page);

    // console.log("output", output)
    res.status(StatusCodes.OK).json(output);
}


/**
 * Call a service with post.
 */
router.post('/people', people);


// Export default
export default router;