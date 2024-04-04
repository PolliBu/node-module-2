import { User } from "../models/userModel.js";
import { catchAsync } from "../utils/catchAsync.js";

export const createUser = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    user: newUser,
  });
});

export const getUsersList = catchAsync(async (req, res) => {
  const users = await User.find();
  // const users = await User.find().select('name role');
  // const users = await User.find().select('-password');
  // const users = await User.find().select('+password');

  res.status(200).json({
    users,
  });
});

export const getOneUser = (req, res) => {
  const { user } = req;

  res.status(200).json({
    user,
  });
};

export const updateUser = catchAsync(async (req, res) => {
  const { user, body } = req;

  const updatedUser = await User.findByIdAndUpdate(user.id, body, {
    new: true,
  });

  res.status(200).json({
    user: updatedUser,
  });
});

export const deleteUser = catchAsync(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  // res.status(200).json({
  //   msg: 'success!',
  // });

  res.sendStatus(204);
});
