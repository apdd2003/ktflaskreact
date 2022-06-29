"""
 Desc:
  Generate a list of 10 random integers using randint()
"""

import random
import numpy as np
from PIL import Image as im
import cv2

Start = 9
Stop = 99
limit = 768
cframe = [random.randint(Start, Stop) for iter in range(limit)]


def save_camera_image(cframe):

    # print(cframe)
    arr = np.array(cframe, np.uint8)
    arr_2d = np.reshape(arr, (32, 24))
    # print(arr_2d)
    data = im.fromarray(arr_2d)

    # saving the final output
    # as a PNG file
    # data.save('gfg_dummy_pic.png')

    # import matplotlib.pyplot as plt
    # image = cv2.imread('gfg_dummy_pic.png', 0)
    # # gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # heatmap = cv2.applyColorMap(image, cv2.COLORMAP_JET)

    # cv2.imshow('heatmap', heatmap)
    # cv2.waitKey()

    heatmap = cv2.resize(arr_2d, (600, 800))
    # plt.matshow(heatmap)
    # plt.show()
    heatmapshow = None
    heatmapshow = cv2.normalize(heatmap,
                                heatmapshow,
                                alpha=0,
                                beta=255,
                                norm_type=cv2.NORM_MINMAX,
                                dtype=cv2.CV_8U)
    heatmapshow = cv2.applyColorMap(heatmapshow, cv2.COLORMAP_JET)
    # print(heatmapshow)
    # cv2.imshow("Heatmap2", heatmapshow)
    cv2.imwrite('static/images/out.jpg', heatmapshow)


# cv2.waitKey(0)