#include <stdio.h>
#include "helpers.h"

// Convert image to grayscale
void grayscale(int height, int width, RGBTRIPLE image[height][width])
{
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            // printf("Blue:%i-Green:%i-Red:%i\n",image[i][j].rgbtBlue ,image[i][j].rgbtGreen, image[i][j].rgbtRed);
            int sum = image[i][j].rgbtBlue + image[i][j].rgbtGreen + image[i][j].rgbtRed;
            int average = sum /3;
            image[i][j].rgbtBlue = average;
            image[i][j].rgbtGreen = average;
            image[i][j].rgbtRed = average;
        }
    }
    return;
}

// Convert image to sepia
void sepia(int height, int width, RGBTRIPLE image[height][width])
{
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            int sepiaRed = (.393 * image[i][j].rgbtRed) + (.769 * image[i][j].rgbtGreen) + (.189 * image[i][j].rgbtBlue);
            int sepiaGreen = (.349 * image[i][j].rgbtRed) + (.686 * image[i][j].rgbtGreen) + (.168 * image[i][j].rgbtBlue);
            int sepiaBlue = (.272 * image[i][j].rgbtRed) + (.534 * image[i][j].rgbtGreen) + (.131 * image[i][j].rgbtBlue);
            (sepiaRed > 255) && (sepiaRed = 255); (sepiaRed < 0) && (sepiaRed = 0);
            (sepiaGreen > 255) && (sepiaGreen = 255); (sepiaGreen < 0) && (sepiaGreen = 0);
            (sepiaBlue > 255) && (sepiaBlue = 255); (sepiaBlue < 0) && (sepiaBlue = 0);
            image[i][j].rgbtBlue = sepiaBlue;
            image[i][j].rgbtGreen = sepiaGreen;
            image[i][j].rgbtRed = sepiaRed;
        }
    }
    return;
}

// Reflect image horizontally
void reflect(int height, int width, RGBTRIPLE image[height][width])
{
    for (int i = 0; i < height; i++)
    {
        int substract = 1;
        for (int j = 0; j < width / 2; j++)
        {
            RGBTRIPLE tempPixel;

            tempPixel.rgbtBlue = image[i][j].rgbtBlue;
            tempPixel.rgbtGreen = image[i][j].rgbtGreen;
            tempPixel.rgbtRed = image[i][j].rgbtRed;

            image[i][j].rgbtBlue = image[i][width - substract].rgbtBlue;
            image[i][j].rgbtGreen = image[i][width - substract].rgbtGreen;
            image[i][j].rgbtRed = image[i][width - substract].rgbtRed;

            image[i][width - substract].rgbtBlue = tempPixel.rgbtBlue;
            image[i][width - substract].rgbtGreen = tempPixel.rgbtGreen;
            image[i][width - substract].rgbtRed = tempPixel.rgbtRed;
            substract++;
        }
    }
    return;
}

// mirror effect
void mirror(int height, int width, RGBTRIPLE image[height][width])
{
    for (int i = 0; i < height; i++)
    {
        int substract = 1;
        for (int j = 0; j < width; j++)
        {
            RGBTRIPLE tempPixel;

            tempPixel.rgbtBlue = image[i][j].rgbtBlue;
            tempPixel.rgbtGreen = image[i][j].rgbtGreen;
            tempPixel.rgbtRed = image[i][j].rgbtRed;

            image[i][j].rgbtBlue = image[i][width - substract].rgbtBlue;
            image[i][j].rgbtGreen = image[i][width - substract].rgbtGreen;
            image[i][j].rgbtRed = image[i][width - substract].rgbtRed;
            substract++;
        }
    }
    return;
}

// Blur image
void blur(int height, int width, RGBTRIPLE image[height][width])
{
    for (int i = 0; i < height; i++)
    {
        int hI = i;
        for (int j = 0; j < width; j++)
        {
            int wI = j;
            int quantity = 0;
            int average[3];
            int sum[3] = {0,0,0};
            for (int h = hI - 1; h < hI + 2; h++)
            {
                if (h >= 0 && h < height)
                {
                    for (int w = wI - 1; w < wI + 2; w++)
                    {
                        if (w >= 0 && w < width)
                        {
                            sum[0] += image[h][w].rgbtBlue;
                            sum[1] += image[h][w].rgbtGreen;
                            sum[2] += image[h][w].rgbtRed;
                            quantity++;
                        }
                    }
                }
            }
            image[i][j].rgbtBlue = sum[0] / quantity;
            image[i][j].rgbtGreen = sum[1] / quantity;
            image[i][j].rgbtRed = sum[2] / quantity;
        }
    }
  return;
}