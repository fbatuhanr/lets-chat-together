import { Request, Response, NextFunction } from "express"
import * as userService from './user.service'
import { CustomRequest } from "../../middleware/authMiddleware";
import ms from "ms";

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await userService.getAll());
  } catch (err) {
    console.error(`Error while getAll`, err);
    next(err);
  }
}
async function getAllWithLimitation(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await userService.getAllWithLimitation(page, limit)
    if (result)
      return res.status(200).json(result)

    res.status(500).json({ message: 'Unexpected error occurred.' });

  } catch (err) {
    console.error(`Error while getAllWithLimitation`, err);
    next(err);
  }
}

async function get(req: CustomRequest, res: Response, next: NextFunction) {
  try {

    if (req.user.userId !== req.params.id) { // authMiddleware tarafından başarıyla decoded edilmişse req.user'a decoded bilgileri döndürülür.
      return res.status(403).json({ message: 'Access denied' });
    }
    res.json(await userService.get(req.params.id));
  } catch (err) {
    console.error(`Error while getting the list`, err);
    next(err);
  }
}
async function getByUsername(req: CustomRequest, res: Response, next: NextFunction) {
  try {
    const username = req.query.username as string
    res.json(await userService.getByUsername(username));
  } catch (err) {
    console.error(`Error while getByUsername`, err);
    next(err);
  }
}
async function searchUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const searchRegex = new RegExp(req.query.query as string, 'i')
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    console.log(req.query)

    const result = await userService.searchUsers(searchRegex, page, limit)
    if (result)
      return res.status(200).json(result)

    res.status(500).json({ message: 'Unexpected error occurred.' });

  } catch (err) {
    console.error(`Error while getAllWithLimitation`, err);
    next(err);
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const result: any = await userService.login(req.body);
    if (!result)
      return res.status(404).json({ message: 'Invalid username or password!' })
    if (!result.refreshToken || !result.accessToken)
      return res.status(500).json({ message: 'Unexpected error occurred.' });

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // its true when production and its false development mode
      sameSite: process.env.NODE_ENV === 'production' ? "none" : "strict", // its none when production mode because server and client maybe based on different domains, its strict when development mode because server and client on same domain (localhost), only ports are different
      maxAge: ms(process.env.REFRESH_TOKEN_EXPIRATION!)
    });
    return res.status(200).json({
      message: 'Login successful!',
      accessToken: result.accessToken
    })

  } catch (error) {
    next(error)
  }
}

async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    await userService.logout(); // Logout işlemi için service fonksiyonunu çağır
    res.clearCookie('refreshToken'); // Refresh token çerezini temizle
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
}

async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const isSignedUp = await userService.signup(req.body);
    if (isSignedUp) {
      return res.status(201).json({ message: 'Signup successful!' });
    } else {
      return res.status(500).json({ message: 'Signup failed!' });
    }
  } catch (error) {
    next(error)
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await userService.update(req.params.id, req.file, req.body));
  } catch (err) {
    console.error(`Error while updating the list`, err);
    next(err);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await userService.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting the list`, err);
    next(err);
  }
}

export { getAll, getAllWithLimitation, get, getByUsername, searchUsers, login, logout, signup, update, remove }