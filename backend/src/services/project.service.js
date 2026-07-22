import prisma from '../config/db.js';
import AppError from '../utils/appError.js';

export const createProject = async (userId, projectData) => {
  const { title, description, goal } = projectData;
  if (!title) {
    throw new AppError('Project title is required.', 400);
  }

  const project = await prisma.project.create({
    data: {
      title,
      description,
      goal,
      ownerId: userId,
    },
  });

  return project;
};

export const getProjectsForUser = async (userId) => {
  return prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { updatedAt: 'desc' },
  });
};

export const getProjectById = async (userId, projectId) => {
  const project = await prisma.project.findFirst({
    where: { id: projectId, ownerId: userId },
  });

  if (!project) {
    throw new AppError('Project not found.', 404);
  }

  return project;
};

export const updateProject = async (userId, projectId, projectData) => {
  const { title, description, goal, status } = projectData;

  const project = await prisma.project.findFirst({
    where: { id: projectId, ownerId: userId },
  });

  if (!project) {
    throw new AppError('Project not found.', 404);
  }

  return prisma.project.update({
    where: { id: projectId },
    data: {
      title: title ?? project.title,
      description: description ?? project.description,
      goal: goal ?? project.goal,
      status: status ?? project.status,
    },
  });
};

export const deleteProject = async (userId, projectId) => {
  const project = await prisma.project.findFirst({
    where: { id: projectId, ownerId: userId },
  });

  if (!project) {
    throw new AppError('Project not found.', 404);
  }

  await prisma.project.delete({ where: { id: projectId } });
  return true;
};
