Volts = 2

ZeroWind_V = 1.45
Temp_C = 25


WS_MPH = (((Volts - ZeroWind_V) / (3.038517 * (Temp_C ** 0.115157 ))) / 0.087288 ) ** 3.009364

print(WS_MPH)

