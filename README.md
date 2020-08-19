# star-power-beta

This app is meant to provide some basic analysis of potential solar yield for a given
orbital path. It is built on top of Plotly.JS, which leverages D3.

The algorithm to produce percentage solar yield is based upon the compounded cosine
of the angles of the array with respect to a direct line from the sun, hitting at 0, 0
in X and Y. From there, there is the possibility of angular rotation in the Z and X axes -
Z would be rotation along the length of the solar array, and X would be rotation at the 
point of contact between the solar array and the spacecraft.

This assumes that the solar array is connected on the sides of the spacecraft, which 
are oriented normal to the direction of orbit. Further dynamic behavior will be added 
to accommodate orientational deviations from this established norm.

*Solar Yield Algorithm*

### 19 AUG 2020 ###
The current implementation of the solar yield algorithm makes several assumptions to 
simplify the calculations involved. First, it assumes that the spacecraft is oriented 
Earth-facing with the solar array extended from its sides in such a way that it is 
normal to the orbital path. In other words, it is assumed the spacecraft is moving 
directly North, with the solar array(s) extended East / West.

The second assumption is that the solar arrays have two possible axes of rotation - 
one along its length (running East / West) and another running down the point of contact 
between the array and the side of the spacecraft. These axes are referred to as Z and X, 
respectively.

The ranges defined for the solar yield array are determined by the angular rotation
to which they are tied. The z axis angular rotation is the pivot of the solar array
along its length, which would alter its position with respect to the rear surface
of the spacecraft. 

The x axis angular rotation is the pivot of the solar array at its point of connection,
either falling below or extending beyond the point at which it is normal to the side
of the spacecraft.
