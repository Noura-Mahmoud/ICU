import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from scipy import signal

sfreq=100
high_band=20
low_band=450
low_pass=10

data = pd.read_csv("data/input1.txt", delimiter = "\t", header=None, skiprows=3)
data.drop(columns=data.columns[0], axis=1, inplace=True)
data = data.loc[:, (data != 0).any(axis=0)]
#plotting data 
legend=[]

for c in data:
    y = data[c]
    # legend.append("A_{}".format(c-4))
    high_band = high_band/(sfreq/2)
    low_band = low_band/(sfreq/2)
    
    # create bandpass filter for EMG
    b1, a1 = signal.butter(3, [high_band,low_band], btype='bandpass',fs=sfreq)
    
    # process EMG signal: filter EMG
    emg_filtered = signal.filtfilt(b1, a1,y)    
    
    # process EMG signal: rectify
    emg_rectified = abs(emg_filtered)
    
    # create lowpass filter and apply to rectified signal to get EMG envelope
    low_pass = low_pass/(sfreq/2)
    b2, a2 = signal.butter(3, low_pass, btype='lowpass')
    emg_envelope = signal.filtfilt(b2, a2,  emg_rectified)
    avg = np.mean(emg_envelope)
    max = np.max(emg_envelope)

    peaks_total = np.where(emg_envelope > avg )
    above_avg = emg_envelope[peaks_total[0]]
    above_avg_distance = above_avg - avg
    peaks_max = np.where(above_avg_distance > 0.5*(max-avg))
    peaks_values = above_avg[peaks_max[0]]

    # test=[]
    # for i in peaks_values:
    #     test.extend(np.where(emg_envelope == i)[0].tolist())

    print("Peaks count: ", len(peaks_max[0]))
    # plt.plot(test,emg_envelope[test],"x" )
    # plt.plot(emg_envelope)
    plt.plot(emg_envelope, label='peaks = %i' %(len(peaks_max[0])))
    

plt.xlabel('time points')
plt.ylabel('signal')
plt.legend()

plt.savefig('output/log1.png')
# plt.savefig('output/log2.png')

plt.show()